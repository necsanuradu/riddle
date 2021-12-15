import React, { Component } from "react";
import Riddle from "./riddle";

class MainComponent extends Component {
  riddle() {
    return ` 
    ...text before
    <div class="bg-success container pt-1 mt-3" >
    <RiddleTest import(.../pre-components/demofile1) />
    ...text in-between
    <NoodleTest import(.../pre-components/demofile25) />
    ...text after
    </div>
  `;
  }
  render() {
    return <Riddle riddleContent={this.riddle()} />;
  }
}

export default MainComponent;
/*

// This is the extended example that uses remakeComponent() and saveNewComponent()
// following the component.instructions (this functionality is no finalised)


{Products{
  category:text:.d-inline: ::before:unique
}}

<Filter:Price::filters import(./components/filter-range-slider) />
<Filter:Type::filters />
<Filter:Size::filters />



<Products::xyza.com.card.classnew
  url(someapi.com) 
  context(from) 
  apply(filters)
  method(get) 
  keep(name, price, size, category) 
  state(price, size) 
  minlength(1) 
  maxlength(5) 
  overflow(under) 
  sort(asc)
  target(new)
  >
  name:text:.card-header:right
  "Price: £" price:number:card-body.text-left>badge.text-red:toFixed(2)
</Products> 

<Commission:.row:nth-child(2)[render==none]:last-child[state=={this.commission}]
  import(./components/comission) 
  componentDidMount(+(this.setState({ color: this.props.color })))
/>
*/
