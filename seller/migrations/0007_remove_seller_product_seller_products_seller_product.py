# Generated by Django 4.2.11 on 2024-03-24 23:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0010_remove_product_seller'),
        ('seller', '0006_seller_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller',
            name='product',
        ),
        migrations.AddField(
            model_name='seller',
            name='products',
            field=models.ManyToManyField(blank=True, to='products.product'),
        ),
        migrations.CreateModel(
            name='Seller_Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('products', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seller.seller')),
            ],
        ),
    ]
