import type { InnListItem } from "components/Inn/types"
import type { FC } from "react"

export const InnsList: FC<{ inns: InnListItem[] }> = ({ inns }) => (
  <div className="mb-4">
    <h3 className="font-medium mb-2">Explore inns</h3>
    <div className="space-y-2">
      {inns.map(({ iid, inn_name }) => (
        <div key={iid} className="flex items-center">
          <div className="flex flex-grow">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-2" />
            <span>{inn_name}</span>
          </div>
          <button type="button" className="btn-primary text-xs px-2 py-1">
            Join
          </button>
        </div>
      ))}
    </div>
  </div>
)
