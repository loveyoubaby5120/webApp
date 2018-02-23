import * as $ from 'jquery';

export const browserCompatibilityTips = () => {
  if (!$('body').data('browserCompatibilityTips') && !!(window as any)['ActiveXObject'] || 'ActiveXObject' in (window as any)) {
    let userAgent = navigator.userAgent;
    let isIE11 = (userAgent.toLowerCase().indexOf('trident') > -1 && userAgent.indexOf('rv') > -1);
    let isEdge = userAgent.indexOf('Edge') > -1;
    if (!isIE11 && !isEdge) {
      $('body').css({
        'position': 'relative',
        'margin-top': '40px',
      });

      $('.header').css({
        'position': 'absolute',
      });

      let box = $('<div id="compatibility_tips_box" />').prependTo($(document.body));
      let text = $(`<p>
        <i class='fa fa-exclamation-triangle' />
        For better experience, we recommend Chrome, Firefox, Internet Explorer 11 for viewing purpose.
        <a id='compatibility_tips_more'
          data-container='body'
          data-toggle='popover'
          data-placement='bottom'
          data-trigger='hover'
          data-template="<div class='popover' role='tooltip'>
            <div class='arrow'></div>
            <h3 class='popover-title'></h3><div class='popover-content' style='white-space: pre-line'></div>
          </div>"
          data-content='Support：\n
            Internet Explorer 11 \n
            Google Chrome | Firefox | Safari | Opera | Maxthon | Netscape \n\n
            Not Support：\n
            Internet Explorer 10 and less than this version \n
            The world browser (with IE8|9|10)\n
            360 browser (with IE8|9|10)\n
            QQ browser (with IE8|9|10)'>
          More.
        </a>
      </p>`).appendTo(box);
      let btn = $('<i class="fa fa-times" style="float: right"></i>').prependTo(text);

      box.css({
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'right': 0,
        'height': '40px',
        'padding': '10px 20px',
        'background-color': '#FFF9D7',
        'text-align': 'center',
        'z-index': 1000,
      });

      text.css({
        'color': '#000',
      });

      btn.bind('click', function () {
        $('#compatibility_tips_box').remove();
      });

      ($('#compatibility_tips_more') as any).popover('toggle').popover('toggle');
    }
  }
  $('body').data('browserCompatibilityTips', 'true');
};
