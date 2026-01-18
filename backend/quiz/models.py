from django.db import models
import uuid


class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class QuestionType(models.Model):
    """
    Example:
    - MCQ
    - RADIO
    - TEXT
    - FILL_BLANK
    """
    code = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.code


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question_text = models.TextField("question_text")
    question_type = models.ForeignKey(
        QuestionType,
        on_delete=models.PROTECT
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]

class QuizQuestion(models.Model):
    """
    Mapping table between Quiz and Question
    """
    quiz = models.ForeignKey(
        Quiz,
        related_name="quiz_questions",
        on_delete=models.CASCADE
    )
    question = models.ForeignKey(
        Question,
        related_name="quiz_questions",
        on_delete=models.CASCADE
    )
    order = models.PositiveIntegerField()
    
    class Meta:
        unique_together = ("quiz", "question")
        ordering = ["order"]

    def __str__(self):
        return f"{self.quiz.title} → {self.question.id}"


class QuestionOption(models.Model):
    """
    Used only for MCQ / RADIO
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(
        Question,
        related_name="options",
        on_delete=models.CASCADE
    )
    value = models.CharField(max_length=255)
    label = models.CharField(max_length=255)

    def __str__(self):
        return self.label


class QuestionScoring(models.Model):
    """
    Scoring rules + correct answer
    """
    question = models.OneToOneField(
        Question,
        related_name="scoring",
        on_delete=models.CASCADE
    )
    correct_answer = models.JSONField()
    marks_correct = models.FloatField(default=1.0)
    marks_incorrect = models.FloatField(default=0.0)

    def __str__(self):
        return f"Scoring for {self.question.id}"


class QuizAttempt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    total_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)


class QuestionAttempt(models.Model):
    quiz_attempt = models.ForeignKey(
        QuizAttempt,
        related_name="question_attempts",
        on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    submitted_answer = models.JSONField()
    is_correct = models.BooleanField()
    score_awarded = models.FloatField()
