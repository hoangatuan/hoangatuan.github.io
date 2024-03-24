
# Table of contents
1. Components["components"]
2. Pages["pages"]
3. Styles["styles"]

## 1. Components

### The Component Script:
- uses a code fence (---) to identify the component script
- importing, write javascript code

### Component Props

```astro
---
const { greeting, name } = Astro.props;

=> <GreetingHeadline greeting="Hi" name={name} />

/// Can use interface and default value
interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hello", name } = Astro.props;
---
```

### Slots

The <slot /> element is a placeholder for external HTML content, allowing you to inject (or “slot”) child elements from other files into your component template.

```astro
    <slot />  // children will go here. If not specify name => use "default" name
    
    <slot name="after-header" /> // Use name for slot.
    
    <slot>
    <p>This is my fallback content, if there is no child passed into slot</p>
    </slot> // use to provide default value for slot
    
    => Useage: `<p slot="after-header">Copyright 2022</p>`
```

To pass multiple HTML elements into a slot, use Fragment component:

```astro
<Fragment slot="body"> <!-- pass table body -->
    <tr><td>Flip-flops</td><td>64</td></tr>
    <tr><td>Boots</td><td>32</td></tr>
    <tr><td>Sneakers</td><td class="text-red-500">0</td></tr>
  </Fragment>
```

## Pages

## Layouts

## 3. Styles

- When you place a <style> tag inside of an Astro component, Astro will detect the CSS and handle your styles for you, automatically.
```astro
<style>
  h1 {
    color: red;
  }

  .text {
    color: blue;
  }
</style>
```

- Global style:
<style is:global>
  /* Unscoped, delivered as-is to the browser.
     Applies to all <h1> tags on your site. */
  h1 { color: red; }
</style>

### class:list

---
const { isRed } = Astro.props;
---
<!-- If `isRed` is truthy, class will be "box red". -->
<!-- If `isRed` is falsy, class will be "box". -->
<div class:list={['box', { red: isRed }]}><slot /></div>

<style>
  .box { border: 1px solid blue; }
  .red { border-color: red; }
</style>
