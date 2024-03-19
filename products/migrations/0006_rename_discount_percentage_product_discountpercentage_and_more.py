# Generated by Django 5.0.3 on 2024-03-16 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_remove_product_discountpercentage_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='discount_percentage',
            new_name='discountPercentage',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='IMAGE',
            new_name='images',
        ),
        migrations.AddField(
            model_name='product',
            name='thumbnail',
            field=models.ImageField(default=1, upload_to='products/thumbnails/'),
            preserve_default=False,
        ),
    ]