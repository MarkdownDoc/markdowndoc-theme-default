<header class="row text-center">
  <section class="column medium-12">
    Menu
  </section>
</header>

<nav class="hide-for-small-only">
  <ul class="tree">
    <li>
      <input type="checkbox" checked="checked" id="c1" />
      <label class="tree_label" for="c1">Home</label>
      <ul>
        {{ linkbuilder | join(',') | safe | replace(',', '', 'g') }}
      </ul>
    </li>
  </ul>
</nav>
