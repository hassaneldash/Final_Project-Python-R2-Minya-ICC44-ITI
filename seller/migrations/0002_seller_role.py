# Generated by Django 4.2.11 on 2024-03-24 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='seller',
            name='role',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
