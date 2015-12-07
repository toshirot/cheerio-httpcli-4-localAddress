#!/usr/bin/env node
/*eslint no-console:0, no-invalid-this:0*/
'use strict';

/**
 * 同期リクエストによるGoogle検索サンプル
 *
 * 以下のword変数の内容で検索します
 */
var word = 'チュパカブラ';


var client = require('../index');

console.log('--- Bingで検索 ---');
var result1 = client.fetchSync('http://www.bing.com/search', { q: word });
if (result1.error) {
  console.error(result1.error);
} else {
  var results1 = [];
  // 検索結果が個別に格納されている要素をループ
  var $ = result1.$;
  $('.b_algo').each(function (idx) {
    // 各検索結果のタイトル部分とURL、概要を取得
    var $h2 = $(this).find('h2');
    var url = $h2.find('a').attr('href');
    if (url) {
      results1.push({
        title: $h2.text(),
        url: url,
        description: $(this).find('.b_caption p').text()
      });
    }
  });
  console.log(results1);
}

console.log('\n--- Googleで検索 ---');
var result2 = client.fetchSync('http://www.google.co.jp/search', { q: word });
if (result2.error) {
  console.error(result2.error);
} else {
  var results2 = [];
  // 検索結果が個別に格納されている要素をループ
  var _$ = result2.$;
  _$('#rso .g').each(function (idx) {
    // 各検索結果のタイトル部分とURL、概要を取得
    var $h3 = _$(this).find('h3');
    var url = $h3.find('a').attr('href');
    if (url) {
      results2.push({
        title: $h3.text(),
        url: url,
        description: _$(this).find('.st').text()
      });
    }
  });
  console.log(results2);
}
