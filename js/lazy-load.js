/**
 * 실시간 인기 상품 Lazy Loading
 * - 처음에는 1~8번 상품만 노출 (HTML에 작성)
 * - 페이지 끝에 도달하면 9~16번 상품 8개를 추가로 노출
 * - 최대 10회까지만 추가 로딩
 */
(function () {
  var list = document.querySelector('.best_item ul');
  var sentinel = document.querySelector('.lazy_sentinel');
  if (!list || !sentinel) return;

  var MAX_LOAD = 10;
  var loadCount = 0;
  var isLoading = false;

  /** 상품 li 하나 생성 (imgNo: 이미지 번호, itemNo: 상품 순번) */
  function createItem(imgNo, itemNo) {
    var li = document.createElement('li');
    li.innerHTML =
      '<a href="#none">' +
        '<span class="thumb"><img src="img/best/' + imgNo + '.jpg" alt="상품' + imgNo + ' 이미지" loading="lazy"></span>' +
        '<h4>상품제목' + itemNo + '</h4>' +
        '<p>상품에 대한 설명입니다</p>' +
        '<span>30,000원</span>' +
      '</a>';
    return li;
  }

  /** 9~16번 상품 8개 추가 */
  function loadMore() {
    if (isLoading || loadCount >= MAX_LOAD) return;
    isLoading = true;
    sentinel.textContent = '상품을 불러오는 중...';

    setTimeout(function () {
      var fragment = document.createDocumentFragment();
      var startNo = list.children.length + 1;
      for (var i = 0; i < 8; i++) {
        fragment.appendChild(createItem(9 + i, startNo + i));
      }
      list.appendChild(fragment);
      loadCount++;
      isLoading = false;

      if (loadCount >= MAX_LOAD) {
        observer.disconnect();
        sentinel.textContent = '모든 상품을 불러왔습니다.';
      } else {
        sentinel.textContent = '';
      }
    }, 400);
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) loadMore();
  });
  observer.observe(sentinel);
})();
