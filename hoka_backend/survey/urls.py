from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponseRedirect


urlpatterns = [
    url(r'^fetch-questions/$', views.FetchQuestions),
    url(r'^fetch-forms-cards/$', views.FetchFormCards),
    url(r'^add-question/$', views.AddQuestion),
    url(r'^submit-form/$', views.SumbitForm),
    url(r'^create-form/$', views.CreateForm),




]
