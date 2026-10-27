/**
 * 배너 상세 페이지
 * - 주소의 ?no=번호 값을 읽어 해당 배너 이미지를 표시
 */
(function () {
  var params = new URLSearchParams(location.search);
  var no = Number(params.get('no'));
  if (!(no >= 1 && no <= 6)) no = 1;

  var img = document.querySelector('.banner_detail img');
  img.src = 'img/banner/main' + no + '.jpg';
  img.alt = '메인 배너 ' + no;
  document.title = '배너 ' + no + ' - 안나앤모드';
})();
