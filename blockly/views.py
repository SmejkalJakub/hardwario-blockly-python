from django.http.response import HttpResponse
from django.template import loader
from django.shortcuts import redirect
import os
from . import code_generator
import mimetypes

def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

def parse_code(request):
    code = request.GET.get('Code')    
    print(code)
    code_generator.generate_code(code)

    response = redirect('/')
    #BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #filename = 'firmware.bin'
    #filepath = BASE_DIR + '/skeleton/' + filename
    #path = open(filepath, 'rb')
    #mime_type, _ = mimetypes.guess_type(filepath)
    #response = HttpResponse(path, content_type=mime_type)
    #response['Content-Disposition'] = "attachment; filename=%s" % filename
    return response

def update_code(request):
    code = request.GET.get('Code')    
    print(code)
    code = code_generator.generate_code(code)
    return HttpResponse(code, content_type="text/plain") 
    
def download_code(request):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filename = 'firmware.bin'
    filepath = BASE_DIR + '/skeleton/' + filename
    path = open(filepath, 'rb')
    mime_type, _ = mimetypes.guess_type(filepath)
    response = HttpResponse(path, content_type=mime_type)
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    return response