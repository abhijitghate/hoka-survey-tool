from django.db import models

# Create your models here.


class SurveyForm(models.Model):
    form_name = models.CharField(max_length=250, blank=True, default='')


class Question(models.Model):
    question_statement = models.CharField(
        max_length=250, blank=True, default='')
    form = models.ForeignKey(SurveyForm, blank=True, default='',
                             related_name="questions", on_delete=models.CASCADE)


class Answer(models.Model):
    answer = models.CharField(max_length=250, blank=True, default='')
    author = models.CharField(max_length=250, blank=True, default='')
    question = models.ForeignKey(
        Question, blank=True, default='', related_name="answers", on_delete=models.CASCADE)


class FormResponse(models.Model):
    form = models.ForeignKey(SurveyForm, blank=True, default='',
                             related_name="formresponses", on_delete=models.CASCADE)
    respondant_name = models.CharField(max_length=250, blank=True, default='')
