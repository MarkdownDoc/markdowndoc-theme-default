{% extends 'base.html.swig' %}

{% block content %}
  <section class="container">
    {{ html | raw }}
  </section>
{% endblock %}
