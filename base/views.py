from django.shortcuts import render, redirect,HttpResponse
from .models import User
from .forms import  CustomUserCreateForm,LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from pprint import pprint
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from .tokens import account_activation_token
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str

def home_page(request):
    context = {}
    return render(request, 'home.html', context)


def login_page(request):
    form = LoginForm()
    if request.method == "POST":
        user = authenticate(
            email=request.POST['email'],
            password=request.POST['password']
            )
        if user is not None:
            login(request, user)
            messages.info(request, 'You have successfully logged in.')
            return redirect('account')
        else:
            messages.error(request, 'Email OR Password is incorrect')
            return redirect('login')
    
    context = {'form':form}
    return render(request, 'login.html', context)




def register_page(request):
    form = CustomUserCreateForm()
    
    if request.method == 'POST':
        form = CustomUserCreateForm(request.POST, request.FILES,)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'Activate your account.'
            context = {
                        'user': user,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': account_activation_token.make_token(user),
                    }

            message = render_to_string('email_template.html',context )
            to_email = form.cleaned_data.get('email')
            sent = send_mail(mail_subject, message, 'rajabhima2@gmail.com', [to_email],fail_silently=False,)
            messages.success(request, 'Please confirm your email address to complete the registration')
            return redirect('home')
        else:
            messages.error(request, 'An error has occurred during registration')

    context = {'form':form}
    return render(request, 'register.html', context)

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        result = \
        """
        Thank you for your email confirmation. Now you can login your account.\n
        <a href="http://127.0.0.1:8000/login">Login</a>
        """
        return HttpResponse(result)
    else:
        return HttpResponse('Activation link is invalid!')
    
def logout_user(request):
    logout(request)
    messages.info(request, 'User was logged out!')
    return redirect('home')





@login_required(login_url='/login')
def account_page(request):
    user = request.user
    context = {'user':user}
    return render(request, 'account.html', context)


