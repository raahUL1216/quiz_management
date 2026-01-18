# from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Quiz app")

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Quiz,
    QuizAttempt,
    QuestionAttempt
)
from .utils import evaluate_answer, calculate_score


class QuizListAPIView(APIView):
    """
    GET /quizzes/
    Returns high-level quiz list
    """

    def get(self, request):
        quizzes = Quiz.objects.filter(is_active=True)
        return Response([
            {
                "id": quiz.id,
                "title": quiz.title,
                "description": quiz.description
            }
            for quiz in quizzes
        ])
    

class QuizDetailAPIView(APIView):
    """
    GET /quizzes/{quiz_id}/
    Returns quiz with ordered questions and options
    """

    def get(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(id=quiz_id, is_active=True)
        except Quiz.DoesNotExist:
            return Response(
                {"error": "Quiz not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        questions = []

        quiz_questions = quiz.quiz_questions.select_related(
            "question__question_type"
        ).prefetch_related(
            "question__options"
        )

        for qq in quiz_questions:
            q = qq.question

            questions.append({
                "id": q.id,
                "text": q.question_text,
                "question_type": q.question_type.code,
                "order": qq.order,
                "options": [
                    {
                        "id": opt.id,
                        "value": opt.value,
                        "label": opt.label
                    }
                    for opt in q.options.all()
                ]
            })

        return Response({
            "id": quiz.id,
            "title": quiz.title,
            "description": quiz.description,
            "questions": questions
        })


class QuizScoringAPIView(APIView):
    """
    POST /quizzes/{quiz_id}/submit/
    Submits answers and returns scoring + per-question results
    """

    def post(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(id=quiz_id, is_active=True)
        except Quiz.DoesNotExist:
            return Response(
                {"error": "Quiz not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        answers = request.data.get("answers", {})
        if not isinstance(answers, dict):
            return Response(
                {"error": "Invalid answers format"},
                status=status.HTTP_400_BAD_REQUEST
            )

        quiz_attempt = QuizAttempt.objects.create(quiz=quiz)

        total_score = 0
        question_results = []

        quiz_questions = quiz.quiz_questions.select_related(
            "question__scoring",
            "question__question_type"
        )

        for qq in quiz_questions:
            question = qq.question
            submitted_answer = answers.get(str(question.id))

            is_correct = evaluate_answer(question, submitted_answer)
            score = calculate_score(question, is_correct)
            total_score += score

            QuestionAttempt.objects.create(
                quiz_attempt=quiz_attempt,
                question=question,
                submitted_answer=submitted_answer,
                is_correct=is_correct,
                score_awarded=score
            )

            question_results.append({
                "question_id": question.id,
                "submitted_answer": submitted_answer,
                "is_correct": is_correct,
                "score_awarded": score
            })

        quiz_attempt.total_score = total_score
        quiz_attempt.save()

        return Response(
            {
                "quiz_attempt_id": quiz_attempt.id,
                "total_score": total_score,
                "questions": question_results
            },
            status=status.HTTP_201_CREATED
        )
