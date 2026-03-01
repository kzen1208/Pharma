# NexaCare Pharma Graph

Concept website nha thuoc online co giao dien storefront, kho du lieu thuoc va khu tu van theo benh. Muc tieu la cho ban mot bo khung co the demo ngay tren frontend, sau do mo rong sang API va mo hinh GNN.

## Chay local

Mo truc tiep `index.html` trong trinh duyet, hoac dung web server tinh:

```bash
python3 -m http.server 8080
```

Sau do truy cap `http://localhost:8080`.

## Thanh phan chinh

- `index.html`: bo cuc trang, cac section storefront, kho thuoc, tu van va GNN lab.
- `styles.css`: giao dien, motion, responsive layout, card states, graph visualization.
- `data.js`: du lieu mau cho thuoc, benh va quick search.
- `app.js`: logic search, filter, render chi tiet thuoc, tu van theo benh va mini knowledge graph.

## Vi sao phu hop voi GNN

Bo du lieu nay tu nhien tao thanh do thi di the:

- Node: `drug`, `disease`, `ingredient`, `symptom`
- Edge: `treats`, `contains`, `symptom-of`, `contraindicated-for`, `interacts-with`

Ba bai toan hop ly:

1. Link prediction de goi y thuoc cho benh hoac trieu chung.
2. Node classification de phan nhom muc do nguy co / muc do uu tien.
3. Recommendation co giai thich dua tren neighborhood trong knowledge graph.

## Huong nang cap tiep

1. Tach `data.js` thanh API backend va database.
2. Them dang nhap duoc si, luu lich su tra cuu va profile benh nhan.
3. Them module kiem tra tuong tac thuoc-thuoc va chong chi dinh.
4. Dung PyTorch Geometric hoac DGL de train GNN tren knowledge graph that.
# Pharma
