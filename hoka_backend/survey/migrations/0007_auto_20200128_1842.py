# Generated by Django 3.0.2 on 2020-01-28 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0006_auto_20200128_0453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='surveyform',
            name='number_of_responses',
            field=models.CharField(blank=True, default=0, max_length=250),
        ),
    ]
