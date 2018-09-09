from_currency = function(currency) {
    return Number(currency.replace(/[^0-9.-]+/g,""));
}
to_currency = function(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

price_elems = $('li.sresult > ul.lvprices > li.lvprice > span')
shipping_elems = $('li.sresult > ul.lvprices > li.lvshipping > span > span')

re_currency = '\\d{1,3}(?:[.,]\\d{3})*(?:[.,]\\d{2})';
re_item_price = new RegExp('^\\$' + re_currency + '$');
re_ship_price = new RegExp('^\\+\\$' + re_currency + '$');

for (var i=0;i<price_elems.length;i++) {
    price_str = price_elems[i].innerText.split(" ")[0];
    shipping_str = shipping_elems[i].innerText.split(" ")[0];

    if (re_item_price.test(price_str) && re_ship_price.test(shipping_str)) {
        price = from_currency(price_str);
        shipping = from_currency(shipping_str);
        price_elems[i].innerHTML = to_currency(price+shipping);
        shipping_elems[i].innerHTML = to_currency(price) + ' item + ' + to_currency(shipping) + ' shipping';
    }
}
