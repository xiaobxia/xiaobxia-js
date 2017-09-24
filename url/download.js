/**
 * Created by xiaobxia on 2017/9/24.
 */
function downloadWordHandler() {
    let turnForm = document.createElement('form');
    turnForm.method = 'POST';
    turnForm.action = '';

    let input1 = document.createElement('input');
    input1.setAttribute('name', '');
    input1.setAttribute('type', 'hidden');
    input1.setAttribute('value', '');
    turnForm.appendChild(input1);

    document.body.appendChild(turnForm);
    turnForm.submit();
    turnForm.parentNode.removeChild(turnForm);
}