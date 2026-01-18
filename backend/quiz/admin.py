from django.contrib import admin

from .models import Quiz, QuestionType, Question, QuizQuestion, QuestionOption, QuestionScoring

admin.site.register(Quiz)
admin.site.register(QuestionType)
admin.site.register(Question)
admin.site.register(QuizQuestion)
admin.site.register(QuestionOption)
admin.site.register(QuestionScoring)
