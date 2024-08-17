# from django.http import HttpResponse
from django.shortcuts import render
from .models import Member

# Create your views here.
def hello(request):
    # return HttpResponse('Welcome to the world of Django')
    member_list = Member.objects.order_by('-create_date')
    context = {'member_list' : member_list}
    return render(request, template_name='TestDjango/member_list.html', context=context)
