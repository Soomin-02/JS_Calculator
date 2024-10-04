// 모든 버튼을 선택하여 'buttons' 변수에 저장 (각 버튼에 이벤트 리스너를 추가할 예정)
const buttons = document.querySelectorAll('.button');
// 디스플레이 요소를 선택하여 'display' 변수에 저장 (계산 결과를 표시할 화면)
const display = document.getElementById('display');
// 디스플레이의 초기 값을 '0'으로 설정
display.textContent = '0';

// 첫 번째 피연산자(firstOperand)와 연산자(operator)를 저장할 변수를 선언하고 초기화
let firstOperand = null; // 첫 번째 피연산자는 아직 입력되지 않았으므로 null로 초기화
let operator = null; // 연산자가 아직 선택되지 않았으므로 null로 초기화
let waitingForSecondOperand = false; // 두 번째 피연산자를 입력받을 준비 상태를 표시하는 변수
// 각 버튼에 클릭 이벤트 리스너를 추가합니다.
buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        // 클릭된 버튼의 텍스트 값을 가져옴 (즉, 버튼의 내용)
        const clickedButtonValue = event.target.textContent;

        // 클릭된 버튼이 숫자 버튼일 때 처리하는 부분
        if (event.target.classList.contains('number')) { 
            // 연산자 클릭 후 새로운 숫자를 입력하는 경우
            if (waitingForSecondOperand) {
                display.textContent = clickedButtonValue; // 디스플레이를 클릭된 숫자로 갱신
                waitingForSecondOperand = false; // 두 번째 피연산자 입력 완료, 대기 상태 해제
            } else {
                // 디스플레이 값이 '0'일 때 클릭된 숫자로 교체
                if (display.textContent === '0') {
                    display.textContent = clickedButtonValue;
                } else {
                    // 디스플레이가 '0'이 아닌 경우, 클릭된 숫자를 이어서 표시
                    display.textContent += clickedButtonValue;
                }
            }
        }
        // 클릭된 버튼이 소수점 버튼일 때 처리하는 부분
        if (event.target.classList.contains('decimal')) {
            // 디스플레이에 이미 소수점이 포함되어 있지 않을 때만 소수점을 추가
            if (!display.textContent.includes('.')) {
                display.textContent += '.';
            }
        }

        // 클릭된 버튼이 'C' (clear) 버튼일 때 처리하는 부분
        if (event.target.classList.contains('clear')) {
            // 디스플레이를 '0'으로 초기화
            display.textContent = '0';
            firstOperand = null; // 첫 번째 피연산자를 초기화
            operator = null; // 연산자 초기화
            waitingForSecondOperand = false; // 두 번째 피연산자 대기 상태 초기화
        }

        // 클릭된 버튼이 연산자 버튼일 때 처리하는 부분
        if (event.target.classList.contains('operator')) { // 'operator' 클래스를 가진 버튼에 클릭 이벤트 발생시
            // 현재 디스플레이 값을 숫자로 변환
            const inputValue = parseFloat(display.textContent);

            // 첫 번째 피연산자가 아직 없는 경우
            if (firstOperand === null) {
                
                // 현재 값을 첫 번째 피연산자로 설정
                firstOperand = inputValue;
            } 
            // 연산자가 존재하고 두 번째 피연산자를 기다리지 않는 상태라면
            else if (operator && !waitingForSecondOperand) {
                // 이전 연산 수행 (이전에 선택된 연산자와 첫 번째 피연산자를 사용하여 계산)
                const result = calculate(firstOperand, operator, inputValue);
                display.textContent = result; // 계산 결과를 디스플레이에 표시
                firstOperand = result; // 계산 결과를 첫 번째 피연산자로 저장
            }
            // 선택된 연산자를 저장
            operator = clickedButtonValue;
            // 다음 숫자 입력을 대기
            waitingForSecondOperand = true;
        }

        // 클릭된 버튼이 '=' (등호) 버튼일 때 처리하는 부분
        if (event.target.classList.contains('equals')) {
            // 현재 디스플레이 값을 숫자로 변환하여 두 번째 피연산자로 사용
            const secondOperand = parseFloat(display.textContent);

            // 첫 번째 피연산자와 연산자가 있는 경우에만 계산 수행
            if (firstOperand !== null && operator) {
                // 연산 수행 (선택된 연산자를 기반으로 첫 번째와 두 번째 피연산자 계산)
                const result = calculate(firstOperand, operator, secondOperand);
                display.textContent = result; // 계산 결과를 디스플레이에 표시
                firstOperand = result; // 결과를 첫 번째 피연산자로 저장 (연속된 계산을 위해)
                operator = null; // 연산자를 초기화
                waitingForSecondOperand = true; // 다음 숫자 입력을 대기
            }
        }
    });
});
    // 실제 계산을 수행하는 함수
    function calculate(firstOperand, operator, secondOperand) {
        // 연산자가 '+'일 때 두 숫자를 더함
        if (operator === '+') {
            return firstOperand + secondOperand;
        } 
        // 연산자가 '-'일 때 첫 번째 숫자에서 두 번째 숫자를 뺌
        else if (operator === '-') {
            return firstOperand - secondOperand;
        } 
        // 연산자가 '*'일 때 두 숫자를 곱함
        else if (operator === '*') {
            return firstOperand * secondOperand;
        } 
        // 연산자가 '/'일 때 첫 번째 숫자를 두 번째 숫자로 나눔
        else if (operator === '/') {
            return firstOperand / secondOperand;
        }
        // 연산자가 없을 경우 두 번째 피연산자를 그대로 반환
        return secondOperand;
    }
    