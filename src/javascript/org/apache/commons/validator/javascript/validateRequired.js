
  //$Header: /home/jerenkrantz/tmp/commons/commons-convert/cvs/home/cvs/jakarta-commons//validator/src/javascript/org/apache/commons/validator/javascript/validateRequired.js,v 1.8 2003/11/17 04:57:50 rleland Exp $
  //$Revision: 1.8 $
  //$Date: 2003/11/17 04:57:50 $

    function validateRequired(form) {
        var isValid = true;
        var focusField = null;
        var i = 0;
        var fields = new Array();
        oRequired = new required();

        for (x in oRequired) {
            var field = form[oRequired[x][0]];

            if ((field.type == 'text' ||
                field.type == 'textarea' ||
                field.type == 'file' ||
                field.type == 'checkbox' ||
                field.type == 'select-one' ||
                field.type == 'password') &&
                field.disabled == false) {

                var value = '';
                // get field's value
                if (field.type == "select-one") {
                    var si = field.selectedIndex;
                    if (si >= 0) {
                        value = field.options[si].value;
                    }
                } else if (field.type == 'checkbox') {
                    if (field.checked) {
                        value = field.value;
                    }
                } else {
                    value = field.value;
                }

                if (trim(value).length == 0) {

                    if (i == 0) {
                        focusField = field;
                    }
                    fields[i++] = oRequired[x][1];
                    isValid = false;
                }
            } else if (field.type == "select-multiple") { 
                var numOptions = field.options.length;
                lastSelected=-1;
                for(loop=numOptions-1;loop>=0;loop--) {
                    if(field.options[loop].selected) {
                        lastSelected = loop;
                        value = field.options[loop].value;
                        break;
                    }
                }
                if(lastSelected < 0 || trim(value).length == 0) {
                    if(i == 0) {
                        focusField = field;
                    }
                    fields[i++] = oRequired[x][1];
                    isValid=false;
                }
            } else if ((field.length > 0) && (field[0].type == 'radio' || field[0].type == 'checkbox')) {
                isChecked=-1;
                for (loop=0;loop < field.length;loop++) {
                    if (field[loop].checked) {
                        isChecked=loop;
                        break; // only one needs to be checked
                    }
                }
                if (isChecked < 0) {
                    if (i == 0) {
                        focusField = field[0];
                    }
                    fields[i++] = oRequired[x][1];
                    isValid=false;
                }
            }
        }
        if (fields.length > 0) {
           focusField.focus();
           alert(fields.join('\n'));
        }
        return isValid;
    }
    
    // Trim whitespace from left and right sides of s.
    function trim(s) {
        return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
    }