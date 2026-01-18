from django.urls import path

from . import views

app_name = "quiz"

from django.urls import path
from .views import (
    QuizListAPIView,
    QuizDetailAPIView,
    QuizScoringAPIView
)

urlpatterns = [
    path("", QuizListAPIView.as_view(), name="quiz-list"),
    path("<uuid:quiz_id>/", QuizDetailAPIView.as_view(), name="quiz-detail"),
    path("<uuid:quiz_id>/submit/", QuizScoringAPIView.as_view(), name="quiz-submit"),
]
