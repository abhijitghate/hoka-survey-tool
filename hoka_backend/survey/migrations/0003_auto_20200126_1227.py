# Generated by Django 3.0.2 on 2020-01-26 12:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0002_auto_20200125_1859'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(blank=True, default='', max_length=250)),
                ('author', models.CharField(blank=True, default='', max_length=250)),
                ('question', models.ForeignKey(blank=True, default='', on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='survey.Question')),
            ],
        ),
        migrations.DeleteModel(
            name='Response',
        ),
    ]
