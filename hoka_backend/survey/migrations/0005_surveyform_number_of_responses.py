# Generated by Django 3.0.2 on 2020-01-28 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0004_auto_20200127_0945'),
    ]

    operations = [
        migrations.AddField(
            model_name='surveyform',
            name='number_of_responses',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
