const TABLE_SALE_BY_DATE = [
  {
    title: "Ngày",
    key: "date",
    dataIndex: "date",
    type: "date",
    url: "by_date",
  },
  {
    title: "Doanh thu",
    children: [
      {
        title: "Tiền hàng",
        dataIndex: "product_revenue",
        key: "product_revenue",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "product_revenue",
        key: "product_revenue",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "fee_revenue",
        key: "fee_revenue",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "tax_revenue",
        key: "tax_revenue",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "discount_revenue",
        key: "discount_revenue",
        type: "price",
      },
    ],
  },
  {
    title: "Hình thức thanh toán",
    children: [
      {
        title: "Tiền hàng",
        dataIndex: "cash_payment",
        key: "cash_payment",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "card_payment",
        key: "card_payment",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "transfer_payment",
        key: "transfer_payment",
        type: "price",
      },
      {
        title: "Tiền hàng",
        dataIndex: "debt",
        key: "debt",
        type: "price",
      },
    ],
  },
  {
    title: `Thực thu`,
    dataIndex: "real_money",
    key: "real_money",
    type: "price",
  },
  {
    title: "Số khách",
    dataIndex: "guest_total",
    key: "guest_total",
    type: "price",
  },
];

function count() {
  const a = TABLE_SALE_BY_DATE.length;
  const b = TABLE_SALE_BY_DATE.filter((item) => item.children).length;
  const hasChildren = TABLE_SALE_BY_DATE.filter((item) => item.children);
  let c = 0;
  for (let i of hasChildren) {
    c += i.children.length;
  }
  console.log({ a, b, c });
  console.log("result : ", c - b + (a - b));
}

count();
