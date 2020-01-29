from django.contrib import admin

# Register your models here.
from survey.models import *


class SurveyFormAdmin(admin.ModelAdmin):
    list_display = ('form_name',)


admin.site.register(Question)
admin.site.register(SurveyForm, SurveyFormAdmin)
admin.site.register(Answer)
