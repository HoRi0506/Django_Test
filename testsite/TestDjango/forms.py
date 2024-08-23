from django import forms
from .models import Member

class MemberForm(forms.ModelForm):
    class Meta:
        model = Member # 사용할 모델을 지정
        fields = ['name', 'email', 'profile'] # MemberForm에서 사용할 Member 모델의 속성
        