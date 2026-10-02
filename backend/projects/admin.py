from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "difficulty", "created_at")
    list_filter = ("category", "difficulty")
    search_fields = ("title", "description")
