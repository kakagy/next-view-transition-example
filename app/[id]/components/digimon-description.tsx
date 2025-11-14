import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

type DigimonDescriptionProps = {
  description: string;
};

export function DigimonDescription({ description }: DigimonDescriptionProps) {
  return (
    <Item className="items-start">
      <ItemContent>
        <ItemTitle>{"プロフィール"}</ItemTitle>
        <ItemDescription className="line-clamp-none">
          {description}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
