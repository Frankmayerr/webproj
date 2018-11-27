import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AlertPromise } from 'selenium-webdriver';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: number;
  cvvNumber: string;
  years = [];
  summary: number;
  comment: string;
  valid : boolean;

  constructor() { 
    for (var i = 2018; i <= 2035; i++) {
      this.years.push({year: i});
    }
  }

  inputValidation(objName, filterString) {
    var obj = $('#' + objName);
    var objFormClass = obj.closest('.form-group');
    obj.keypress(function(e) {
      e = e || event;
      var chr = '';
      if (e.ctrlKey || e.altKey || e.metaKey) chr = null;
      else chr = getChar(e);
      if (chr == null) 
        chr='';
      var result = check(obj, filterString, chr);
      if (this.valid && !result)
        this.valid = false;
      // return check(obj, filterString, chr);
  });
  obj.keyup(function(e) {return check(obj, filterString, '');});
  obj.click(function(e) {return check(obj, filterString, '');});

  function getChar(event) {
      if (event.which == null) {
          if (event.keyCode < 32) return null;
          return String.fromCharCode(event.keyCode) // IE
      }
      if (event.which != 0 && event.charCode != 0) {
          if (event.which < 32) return null;
          return String.fromCharCode(event.which) // остальные
      }
      return null; // специальная клавиша
  }

  function check(obj, filterString, chr){
    if (filterString(obj.val() + chr)) {
      obj.removeClass('alert-warning');
      obj.addClass('alert-success');
      objFormClass.removeClass('has-error');
      objFormClass.addClass('has-success');
      return 't';
    }
    obj.removeClass('alert-success');
    obj.addClass('alert-warning');
    objFormClass.removeClass('has-success');
    objFormClass.addClass('has-error');
    return 'f';
  }
  return 'f';
  }

  check_chars(str, filter) {
    for (var i = 0; i < str.length; i++) 
      if (!filter(str.charAt(i)))
        return false;
    return true;
  }

  validate_all() {
    var isValidCard = this.inputValidation('cardNumber', (str) => (str.length == 16) && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')));
    var isValidCvv = this.inputValidation('cvv', (str) => str.length ==3 && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')));
    var isValidSummary = this.inputValidation('summary', (str) => Number(str) >= 1000 && Number(str) <= 75000);
    var isValidComment = this.inputValidation('comment', (str) => str.length <= 150);
    var isValidEmail = this.inputValidation('email', (str) => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    });
    this.valid = isValidCard == 't' && isValidComment == 't' && isValidCvv == 't' && isValidEmail == 't' && isValidSummary == 't';
    this.get_confirm_actual();
    return;
  }

  get_confirm_actual()
  {
    if (this.valid)
      $('#confirm-purchase').addClass('disabled')
    else if ($('#confirm-purchase').hasClass('disabled'))
      $('#confirm-purchase').removeClass('disabled')
  }

  ngOnInit() {
    this.validate_all();
    this.get_confirm_actual();
  }
    // $(document).ready(function() {
    //     var owner = $('#owner');
    //     var cardNumber = $('#cardNumber');
    //     var cardNumberField = $('#card-number-field');
    //     var CVV = $("#cvv");
    //     var mastercard = $("#mastercard");
    //     var confirmButton = $('#confirm-purchase');
    //     alert($('#confirm-purchase'));
    //     var visa = $("#visa");
    //     var amex = $("#amex");

    //     // Use the payform library to format and validate
    //     // the payment fields.

    //     cardNumber.payform('formatCardNumber');
    //     CVV.payform('formatCardCVC');


    //     cardNumber.keyup(function() {

    //         amex.removeClass('transparent');
    //         visa.removeClass('transparent');
    //         mastercard.removeClass('transparent');

    //         if ($.payform.validateCardNumber(cardNumber.val()) == false) {
    //             cardNumberField.addClass('has-error');
    //         } else {
    //             cardNumberField.removeClass('has-error');
    //             cardNumberField.addClass('has-success');
    //         }

    //         if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
    //             mastercard.addClass('transparent');
    //             amex.addClass('transparent');
    //         } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
    //             mastercard.addClass('transparent');
    //             visa.addClass('transparent');
    //         } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
    //             amex.addClass('transparent');
    //             visa.addClass('transparent');
    //         }
    //     });

    //     confirmButton.click(function(e) {
    //         alert("begin")
    //         e.preventDefault();
    //         alert("end")
    //         var isCardValid = $.payform.validateCardNumber(cardNumber.val());
    //         var isCvvValid = $.payform.validateCardCVC(CVV.val());

    //         if (owner.val().length < 5) {
    //             alert("Wrong owner name");
    //         } else if (!isCardValid) {
    //             alert("Wrong card number");
    //         } else if (!isCvvValid) {
    //             alert("Wrong CVV");
    //         } else {
    //             // Everything is correct. Add your form submission code here.
    //             alert("Everything is correct");
    //         }
    //     });
    // });
  }

