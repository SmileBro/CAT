# Generated by Django 4.0.4 on 2022-04-28 09:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='result',
            options={'ordering': ['-created']},
        ),
    ]
