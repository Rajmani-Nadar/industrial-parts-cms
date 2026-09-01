import Image from "next/image";

interface AuthorCardProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export function AuthorCard({ name, role, bio, avatar }: AuthorCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-slate-200">
          <Image src={avatar} alt={name} fill className="object-cover" sizes="64px" />
        </div>
        <div>
          <div className="text-lg font-bold text-slate-900">{name}</div>
          <div className="text-sm text-slate-500">{role}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{bio}</p>
    </div>
  );
}
