from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView
from django.views.generic.base import TemplateView
from django.urls import reverse_lazy

from django.contrib.auth.views import LoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
#forms
from .forms import CreateUserForm
# Imports for Reordering Feature
from django.views import View
from django.shortcuts import redirect
from django.db import transaction
from .models import Result


# Create your views here.
class gameList(TemplateView):
    template_name = 'base/gameList.html'

#class ReactionTime(TemplateView):
#   template_name = 'base/reaction_time/index.html'
def ReactionTime(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            r = Result(user=request.user, game='Скорость реакции', score = request.body)
            r.save()
    return render(request, "base/reaction_time/index.html", {})

def MemoryTest(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            r = Result(user=request.user, game='Порядковая память', score = request.body)
            r.save()
    return render(request, "base/memory_test/memory_test.html", {})

def TypeSpeed(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            r = Result(user=request.user, game='Скорость печати', score = request.body)
            r.save()
    return render(request, "base/type_speed/type_speed.html", {})

def Verbal(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            r = Result(user=request.user, game='Вербальная память', score = request.body)
            r.save()
    return render(request, "base/verbal/verbal.html", {})

class CustomLoginView(LoginView):
    template_name = 'base/login.html'
    fields = '__all__'
    redirect_authenticated_user = True
    def get_success_url(self):
        return reverse_lazy('games')

class RegisterPage(FormView):
    template_name = 'base/register.html'
    form_class = CreateUserForm

    success_url = reverse_lazy('games')

    def form_valid(self, form):
        user = form.save()
        if user is not None:
            login(self.request, user)
        return super(RegisterPage,self).form_valid(form)

    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('games')
        return super(RegisterPage, self).get(*args, **kwargs)

class ResultList(LoginRequiredMixin,ListView):
    model = Result
    template_name = "base/result_list.html"
    context_object_name = 'results'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['results'] = context['results'].filter(user=self.request.user)


        search_input = self.request.GET.get('search-area') or ''
        if search_input:
            context['results'] = context['results'].filter(title__icontains=search_input)

        context['search_inputs'] = search_input
        return context

class ResultCreate(CreateView):
    model = Result
    success_url = reverse_lazy('')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(ResultCreate, self).form_valid(form)