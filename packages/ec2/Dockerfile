FROM python:3.8-slim-buster

USER root
RUN mkdir -p /dyson
RUN chmod -R +rwx /dyson

WORKDIR /dyson

RUN pip3 install pipenv

COPY ./dyson /dyson

RUN cd /dyson
RUN pipenv install
RUN pipenv run python dyson.py