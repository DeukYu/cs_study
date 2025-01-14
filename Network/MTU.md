# MTU (Maximum Transmission Unit)
![image](https://github.com/user-attachments/assets/380a7084-4d54-4231-9eb0-985b63057c43)
- **네트워크에서 전송 가능한 하나의 패킷의 최대 크기**를 의미합니다. 즉, 데이터가 전송될 때, 한 번에 보낼 수 있는 최대 크기의 데이터 블록을 나타냅니다. MTU는 네트워크 인터페이스(예:이더넷, Wi-Fi, 모바일 네트워크)마다 설정됩니다.

## MTU의 특징
- **단위**: 바이트(Byte) 단위로 측정
    - 예를 들어, 이더넷 네트워크의 표준 MTU 크기는 **1500Byte** 입니다.
- **MTU 값의 포함 범위**:
    - IP 패킷의 **헤더(Header)** 크기와 **데이터(payload)** 크기를 모두 포함합니다.
    - 예: 이더넷의 MTU가 1500Byte라면, 그 안에는 IP 헤더(20Byte)와 TCP 헤더(20Byte)가 포함되고, 실제 데이터 크기는 최대 1460Byte입니다.
- **MTU의 역할**:
    - 네트워크 효율성과 성능에 영향을 줍니다.
    - 너무 큰 MTU를 설정하면 패킷 손실이 발생할 가능성이 증가합니다.
    - 너무 작은 MTU는 **오버헤드(헤더 비율)**가 커지기 때문에 네트워크 효율이 저하됩니다.

## MTU 조정이 필요한 경우
- VPN 사용 시:
    - VPN은 터널링 프로토콜에 추가적인 헤더를 삽입하므로, MTU 값을 줄여야 조각화를 방지할 수 있습니다. 일반적으로 **1400~1420 Byte**로 설정합니다.
- 패킷 손실 발생 시:
    - 큰 MTU로 인해 패킷 손실이 발생하면 MTU 값을 줄여 네트워크 안전성을 확보할 수 있습니다.
- 네트워크 성능 최적화:
    - 대역폭이 제한된 네트워크에서는 MTU 값을 조정하여 네트워크 효율성을 개선할 수 있습니다.

## MTU와 성능의 관계
- 작은 MTU:
    - 장점: 전송 속도가 빨라져 지연 시간이 감소
    - 단점: 헤더 오버헤드가 증가하여 대역폭 비효율 발생
- 큰 MTU:
    - 장점: 대역폭 효율성이 증가하고, 데이터 처리량이 향상
    - 단점: 조각화로 인한 패킷 손실 가능성 증가