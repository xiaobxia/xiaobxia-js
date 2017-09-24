/**
 * Created by xiaobxia on 2017/9/24.
 */
function downloadWordHandler(bingqingzsbh) {
    let turnForm = document.createElement('form');
    turnForm.method = 'POST';
    turnForm.action = '';
    document.body.appendChild(turnForm);
    turnForm.submit();
    turnForm.parentNode.removeChild(turnForm);
}