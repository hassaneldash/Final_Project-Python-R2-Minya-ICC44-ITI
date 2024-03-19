# Generated by Django 5.0.3 on 2024-03-18 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='images',
            field=models.ImageField(upload_to='products/images/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='thumbnail',
            field=models.ImageField(upload_to='products/thumbnails/'),
        ),
    ]
