import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src="/17-1515.webp"
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Tết ông Công ông Táo nhớ về bếp ấm, nhà vui
          </h1>
          <p className={styles.postDesc}>
            Nghe qua tưởng đơn giản để thực hiện, nhưng giữa thành phố mà lịch làm việc có thể kéo dài tới khuya,
            những cuộc hẹn chen ngang, điện thoại rung liên tục do deadline (hạn chót), thì giữ được một bữa cơm gia đình mỗi tối lại là chuyện không hề dễ.
            Sơn làm kinh doanh, quen biết nhiều, ra ngoài ăn uống là điều gần như mặc định. Vậy mà cậu ấy vẫn từ chối không ít lời mời,
            chỉ để kịp về trước khi vợ dọn mâm cơm thơm mùi “nhà nấu”.
          </p>
          {/* <button className={styles.button}>Read More</button> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
