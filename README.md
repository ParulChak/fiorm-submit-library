# form-submit-library
This library fetch all input tag from the Form and their respective data.
It will retrive the data and submit the form to the specified action mention in the Form.

To use this library, make sure you have node install in your system
```
npm install formSubmitLib
 ```

````
**Usage in .ts**

To add the import in your component

import Form from 'formSubmitLib';

config = {
            selector: '', // It should be 'class' name of Form 
            message: {
                selector: '',  // It should be 'id' of tag where you want to show message
                onSuccess: '',  // success message 
                onFail: ''      // faiulure message
           }
       };
 form: any;      
       
ngOnInit() {
  this.form = new Form(this.config);
  form.initialize();
}

````

  
```
**Usage in .js**
const Form = require('formSubmitLib');
config = {
            selector: '', // It should be 'class' name of Form 
            message: {
                selector: '',  // It should be 'id' of tag where you want to show message
                onSuccess: '',  // success message 
                onFail: ''      // faiulure message
           }
       };
const temp = new Form(config);
temp.initialize();

```
