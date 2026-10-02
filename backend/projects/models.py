from django.db import models

class Category(models.TextChoices):
    ARDUINO = "Arduino", "Arduino"
    ROBOTICS = "Robotics", "Robotics"
    HOME = "Home Automation", "Home Automation"
    IOT = "IoT", "IoT"
    SENSOR = "Sensors", "Sensors"

class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=Category.choices)
    description = models.TextField()
    components = models.TextField(help_text="Comma-separated components")
    working = models.TextField()
    circuit_diagram = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    source_code = models.TextField(blank=True)
    difficulty = models.CharField(max_length=30, default="Beginner")
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
