FROM python:3.8-slim-buster

RUN mkdir -p /dyson
RUN chmod -R +rwx /dyson

USER root
WORKDIR /dyson

RUN pip3 install pipenv

COPY ./dyson /dyson

RUN cd /dyson
RUN pipenv install
RUN pipenv run python dyson.py