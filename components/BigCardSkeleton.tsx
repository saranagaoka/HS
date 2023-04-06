import { View } from "react-native";
import { Skeleton } from "./Skeleton";

export default function BigCardSkeleton() {
  return (
    <>
      <Skeleton width={50} height={20} />
      <Skeleton width={250} height={30} />
      <Skeleton width={80} height={20} />
      <Skeleton width={"100%"} height={380} style={{ borderRadius: 20 }} />
      <View style={{ paddingTop: 8 }}>
        <Skeleton width={150} height={18} />
        <Skeleton width={"80%"} height={18} />
        <Skeleton width={"100%"} height={20} style={{ marginTop: 20 }} />
        <Skeleton width={"100%"} height={20} />
        <Skeleton width={"100%"} height={20} />
        <Skeleton width={"70%"} height={20} />
      </View>
    </>
  );
}
