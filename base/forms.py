from django.forms import ModelForm
from .models import  User
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import RegexValidator
from django.contrib.auth import  password_validation


class LoginForm(ModelForm):
    password = forms.CharField(
        label="Password",
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "new-password"}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    class Meta:
        model = User 
        fields = ['email', 'password']    

class CustomUserCreateForm(UserCreationForm):

    mobile = forms.CharField(max_length=20, validators=[RegexValidator(
        '^\+?1?\d{9,15}$', message="Phone number must be in the format: '+999999999'. between 9  to 15 digits.")])

    class Meta:
        model = User
        fields = ['username', 'email','first_name', 'last_name', 'mobile','password1']