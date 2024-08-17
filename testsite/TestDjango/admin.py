from django.contrib import admin

# Register your models here.
from .models import Member

class MemberAdmin(admin.ModelAdmin):
    search_fields = ['name']

admin.site.register(Member, MemberAdmin)