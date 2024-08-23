# from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .models import Member
from .forms import MemberForm

# Create your views here.
def index(request):
    # return HttpResponse('Welcome to the world of Django')
    member_list = Member.objects.order_by('-create_date')
    context = {'member_list' : member_list}
    return render(request, template_name='TestDjango/member_list.html', context=context)

def detail(request, member_id):
    # member = Member.objects.get(id=member_id)
    member = get_object_or_404(Member, pk=member_id)
    context = {'member':member}
    return render(request, template_name='TestDjango/member_detail.html', context=context)

def input(request):
    return render(request, template_name='TestDjango/member_input.html')

def create(request):
    # name = request.POST['name'] # 데이터를 가지고 오는 장소에 반드시 인자 값과 같은 값이 존재해야만 하며, 이외에는 오류가 발생
    name = request.POST.get('name') # 인자 값이 잘못 설정되어도 오류가 발생되지 않음
    email = request.POST.get('email')
    profile = request.POST.get('profile')
    
    new_member = Member(name=name, email=email, profile=profile, create_date=timezone.now())
    new_member.save()
    
    return redirect('TestDjango:detail', member_id=new_member.id)

def delete(request, member_id):
    member = get_object_or_404(Member, pk=member_id)
    member.delete()
    return redirect('TestDjango:index')

def editform(requset, member_id):
    member = get_object_or_404(Member, pk=member_id)
    context = {'member':member}
    return render(requset, template_name='TestDjango/member_edit.html', context=context)

def editsave(request):
    id = request.POST.get('id')
    name = request.POST.get('name')
    email = request.POST.get('email')
    profile = request.POST.get('profile')
    
    member = get_object_or_404(Member, pk=id)
    member.name = name
    member.email = email
    member.profile = profile
    member.save()
    
    return redirect('TestDjango:index')

def member_create(request):
    if request.method == 'POST':
        form = MemberForm(request.POST)
        if form.is_valid():
            member = form.save(commit=False)
            member.create_date = timezone.now()
            member.save()
            return redirect('TestDjango:index')
    else:    
        form = MemberForm()
        
    return render(request, template_name='TestDjango/member_form.html', context={'form':form})