import os
import sys

from django.shortcuts import render

from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings


# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from survey.models import *

# logger = logging.getLogger(__name__)


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class FetchQuestionsAPI(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response['status'] = 500
        try:
            form_id = request.data.get("formId", '')
            if form_id:
                questions = SurveyForm.objects.get(pk=form_id).questions.all()
            questions_list = []
            for question in questions:
                temp_dict = {}
                temp_dict['questionStatement'] = question.question_statement
                temp_dict['questionId'] = question.pk
                questions_list.append(temp_dict)
            response['questionList'] = questions_list
            response['status'] = 200

        except Exception as e:
            import os
            exc_type, exc_obj, exc_tb = sys.exc_info()
            print("FetchQuestionsAPI: %s at %s",
                  e, str(exc_tb.tb_lineno))
        return Response(data=response)


FetchQuestions = FetchQuestionsAPI.as_view()


class FetchFormCardsAPI(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response['status'] = 500
        try:

            forms = SurveyForm.objects.all()
            form_list = []
            for form in forms:
                temp_dict = {}
                temp_dict['formName'] = form.form_name
                questions = form.questions.all()
                total_questions = questions.count()
                temp_dict['numberOfQuestions'] = questions.count()
                responses = FormResponse.objects.filter(form=form)
                temp_dict["numberOfResponses"] = responses.count()
                temp_dict["respondants"] = []
                for x in responses:
                    temp_dict["respondants"].append(x.respondant_name)
                for question in questions:
                    answers = Answer.objects.filter(question=question)
                temp_dict["url"] = "http://13.233.138.223/submit-form/" + \
                    str(form.pk)
                temp_dict['formId'] = form.pk
                form_list.append(temp_dict)
            print(form_list)
            response['formList'] = form_list
            response['status'] = 200

        except Exception as e:

            exc_type, exc_obj, exc_tb = sys.exc_info()
            print("FetchFormCardsAPI: %s at %s",
                  e, str(exc_tb.tb_lineno))
        return Response(data=response)


FetchFormCards = FetchFormCardsAPI.as_view()


class AddQuestionAPI(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response['status'] = 500
        try:
            data = request.data
            print(data)
            form = SurveyForm.objects.get(pk=int(data["formId"]))
            new_question = Question.objects.create(
                question_statement=data["question"],
                form=form
            )

            response['status'] = 200

        except Exception as e:

            exc_type, exc_obj, exc_tb = sys.exc_info()
            print("AddQuestionAPI: %s at %s",
                  e, str(exc_tb.tb_lineno))
        return Response(data=response)


AddQuestion = AddQuestionAPI.as_view()


class SumbitFormAPI(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response['status'] = 500
        try:
            data = request.data
            print(data)
            author = data.get('author', 'No author')
            if author != "No author":
                del data['author']

            formId = data.get('formId', '')
            if formId != '':
                del data['formId']
            form = SurveyForm.objects.get(pk=formId)

            form_response = FormResponse.objects.create(
                form=form, respondant_name=author)

            questions = Question.objects.filter(form=form)
            for question in questions:
                answer = Answer.objects.create(
                    author=author, question=question)
                if question.pk in data.keys():
                    answer.answer = data[question.pk]
                    answer.save()
                else:
                    answer.answer = ''
                    answer.save()

            response['status'] = 200

        except Exception as e:

            exc_type, exc_obj, exc_tb = sys.exc_info()
            print("SumbitFormAPI: %s at %s",
                  e, str(exc_tb.tb_lineno))
        return Response(data=response)


SumbitForm = SumbitFormAPI.as_view()


class CreateFormAPI(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response['status'] = 500
        try:
            data = request.data
            print(data)

            # response['formList'] = form_list
            response['status'] = 200

        except Exception as e:

            exc_type, exc_obj, exc_tb = sys.exc_info()
            print("FetchFormCardsAPI: %s at %s",
                  e, str(exc_tb.tb_lineno))
        return Response(data=response)


CreateForm = CreateFormAPI.as_view()


class CreateFormAPI(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response['status'] = 500
        try:
            data = request.data
            questions = data.get("names", "")
            form = SurveyForm.objects.create(form_name=questions[0])
            for question in questions[1:]:
                temp_question = Question.objects.create(
                    question_statement=question, form=form)

            response['status'] = 200

        except Exception as e:

            exc_type, exc_obj, exc_tb = sys.exc_info()
            print("CreateFormAPI: %s at %s",
                  e, str(exc_tb.tb_lineno))
        return Response(data=response)


CreateForm = CreateFormAPI.as_view()
