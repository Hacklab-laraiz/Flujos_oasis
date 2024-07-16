# models.py (Django)
from django.db import models

class Node(models.Model):
    coordinates = models.JSONField()  # {x: Number, y: Number, z: Number}
    type = models.CharField(max_length=50)

class Flow(models.Model):
    source_node = models.ForeignKey(Node, related_name='source_node', on_delete=models.CASCADE)
    target_node = models.ForeignKey(Node, related_name='target_node', on_delete=models.CASCADE)
    intensity = models.FloatField()


# models.py (Django)
class Node(models.Model):
    coordinates = models.JSONField()  # {x: Number, y: Number, z: Number}
    type = models.CharField(max_length=50)


# models.py (Django)
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nodes = models.ManyToManyField(Node)
    flows = models.ManyToManyField(Flow)


# models.py (Django)
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
