import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/phat-hoc.png" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Phật giáo - Con đường hướng đến trí tuệ và an lạc
          </h1>
          <p className={styles.postDesc}>
            Phật giáo là một trong những tôn giáo lớn và có ảnh hưởng sâu rộng
            nhất trên thế giới, bắt nguồn từ Ấn Độ hơn 2.500 năm trước. Giáo lý
            của Đức Phật Thích Ca Mâu Ni dạy con người sống tỉnh thức, từ bi và
            buông bỏ khổ đau. Phật giáo không chỉ là tín ngưỡng mà còn là triết
            lý sống, hướng con người đến sự giác ngộ và giải thoát khỏi luân
            hồi. Qua thời gian, Phật giáo đã lan tỏa khắp châu Á và thế giới,
            trở thành nguồn cảm hứng cho nghệ thuật, văn hóa và đạo đức nhân
            sinh. Ngày nay, Phật giáo vẫn giữ vai trò quan trọng trong việc nuôi
            dưỡng tâm hồn và xây dựng một xã hội an hòa, hạnh phúc.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
