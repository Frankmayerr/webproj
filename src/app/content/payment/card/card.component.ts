import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: number;
  cvvNumber: number;
  years = [];
  sum: number;
  comment: string;

  constructor() { 
    for (var i = 2018; i <= 2035; i++) {
      this.years.push({year: i});
    }
  }

  inputValidation(objName, filterString) {
    var obj = $('#' + objName);
    obj.keypress(function(e) {
      e = e || event;
      var chr = '';
      if (e.ctrlKey || e.altKey || e.metaKey) chr = null;
      else chr = getChar(e);
      if (chr == null) 
        chr='';

      var objFormClass = obj.closest('.form-group');
      if (filterString(obj.val() + chr)) {
        obj.removeClass('alert-warning');
        obj.addClass('alert-success');
        objFormClass.removeClass('has-error');
        objFormClass.addClass('has-success');
      } else {
        obj.removeClass('alert-success');
        obj.addClass('alert-warning');
        objFormClass.removeClass('has-success');
        objFormClass.addClass('has-error');
      }
  });

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
  }

  check_chars(str, filter) {
    for (var i = 0; i < str.length; i++) 
      if (!filter(str.charAt(i)))
        return false;
    return true;
  }

  ngOnInit() {
    this.inputValidation('cardNumber', (str) => (str.length === 16) && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')));
    this.inputValidation('cvv', (str) => str.length === 3 && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')));
    this.inputValidation('summary', (str) => Number(str) >= 1000);
    this.inputValidation('comment', (str) => str.length <= 150);
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

